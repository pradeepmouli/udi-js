#!/usr/bin/env python3

"""
Polyglot v3 plugin - Matter server
Copyright (C) 2025 Universal Devices

MIT License
"""

# https://github.com/UniversalDevicesInc/udi_python_interface/blob/master/API.md

import socket
import json
import threading
import queue
import sys
import traceback
import logging
from udi_interface import LOGGER, Interface, Node

MATTER_LOGGER = logging.getLogger(__name__)
MATTER_LOGGER.setLevel('INFO')


class Controller(Node):
    # nodedef id
    id = 'CTL'

    drivers = [
        # Default value is "Online"
        { 'driver': 'ST', 'value': 1, 'uom': 25 },
        { 'driver': 'GV0', 'value': 0, 'uom': 25 }
    ]

    def __init__(self, polyglot, parent, address, name):
        super(Controller, self).__init__(polyglot, parent, address, name)

        polyglot.addNode(self, conn_status='ST')

        LOGGER.info('Controller Initialized...')

    # The commands here need to match what is in the nodedef profile file.
    commands = {}


class Matter():
    """
        The Matter class is used to manage the socket connection to the Matter service.
        It receives log entries through this socket, and also the pairing code & QR code url.
        When the Matter service is started, the Matter bridge is disabled by default.
        We send a command to the Matter service to start the bridge when the plugin starts,
        and stop the bridge when the plugin stops.
    """
    def __init__(self, polyglot, controller, socketPath):
        self.poly = polyglot
        self.controller = controller
        # socketPath is the unix socket to use to communicate with the Matter service
        self.socketPath = socketPath
        self.matterServiceSocket = None
        self.matterServiceThread = None
        # Connected to the Matter server?
        self.matterConnected = threading.Event()
        # Matter bridge enabled?
        self.matterEnabled = threading.Event()
        LOGGER.info('Matter service socket initialized')

    def start(self):
        """Start the matter connection thread"""
        self.running = True
        self.matterServiceThread = threading.Thread(target=self._matterConnection)
        self.matterServiceThread.daemon = True
        self.matterServiceThread.start()

    # Messages received from Matter service may contain more than 1 message in a single string
    def _splitJsonStrings(str):
        result = []
        bracket_count = 0
        current_json = ""
        in_string = False
        escape_char = False

        for char in str:
            current_json += char

            if escape_char:
                escape_char = False
                continue

            if char == '\\':
                escape_char = True
                continue

            if char == '"' and not escape_char:
                in_string = not in_string
                continue

            if not in_string:
                if char == '{':
                    bracket_count += 1
                elif char == '}':
                    bracket_count -= 1

                    # When bracket_count reaches 0, we've found a complete JSON
                    if bracket_count == 0:
                        try:
                            # Validate it's proper JSON
                            json.loads(current_json)
                            result.append(current_json)
                            current_json = ""
                        except json.JSONDecodeError:
                            pass

        return result

    def _connect(self):
        """Attempt connection to the matter service"""
        try:
            if self.matterServiceSocket:
                self.matterServiceSocket.close()

            self.matterServiceSocket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
            self.matterServiceSocket.connect(self.socketPath)
            LOGGER.info('Connected to Matter service')
            return True

        except ConnectionRefusedError:
            self.matterConnected.clear()
            LOGGER.error("Connection to the Matter service failed - Is the Matter service started?")
            return False

        except Exception:
            self.matterConnected.clear()
            LOGGER.error(f"Connection to the Matter service failed: {traceback.format_exc()}")
            return False


    def _matterConnection(self):
        """
            This is the main loop that manages the connection to the Matter service.
            This is running in a separate thread
        """
        while self.running:
            try:
                if not self.matterConnected.is_set():
                    if self._connect():
                        self.matterConnected.set()
                        self._enableMatter()
                    else:
                        # If we can't connect, let's wait a while
                        self.matterConnected.wait(timeout=30)
                        continue

                # Wait for data
                data = self.matterServiceSocket.recv(4096)
                if not data:
                    LOGGER.info("Connection closed by matter service")
                    # Clearing this flag will trigger _connect, which will close the connection (if active) and reconnect
                    self.matterConnected.clear()
                    self.matterConnected.wait(timeout=5)
                    continue

                try:
                    # Split the data into individual JSON objects (We may have 1 or more)
                    json_strings = Matter._splitJsonStrings(data.decode())
                    for data in json_strings:
                        parsed = json.loads(data)
                        self._processMessage(parsed)

                except json.JSONDecodeError:
                    LOGGER.info(f"Error parsing message: {data.decode()}")

            except Exception:
                LOGGER.error(f"Error in listener: {traceback.format_exc()}")
                # Clearing this flag will trigger _connect, which will close the connection (if active) and reconnect
                self.matterConnected.clear()
                self.matterConnected.wait(timeout=5)

    # Handles log entries coming from the Matter service
    def _log(self, data):
        level = data['level'].lower()
        if level is 'warn':
            level = 'warning'

        getattr(MATTER_LOGGER, level)(data['message'])

    # Handles pairing data coming from the Matter service
    def _pairing(self, pairingInfo):
        if 'url' in pairingInfo:
            polyglot.Notices['pairingUrl'] = f'Use this QR code for pairing: <a href="{pairingInfo["url"]}" target="_blank">QR Code link</a>'
        if 'manualPairingCode' in pairingInfo:
            polyglot.Notices['manualPairing'] = f'Use this code for manual pairing: {pairingInfo["manualPairingCode"]}'

    def _processMessage(self, data):
        """Process a message received from the matter service"""
        try:
            #LOGGER.debug(f"Matter message: {json.dumps(data, indent=2)}")
            if 'type' in data:
                match data['type']:
                    case 'log':
                        self._log(data)
                    case _:
                        LOGGER.info(f"Unknown message type: {message['type']}: {json.dumps(data, indent=2)}")
            elif 'pairingInfo' in data:
                self._pairing(data['pairingInfo'])
            else:
                LOGGER.info(f"Unknown message: {json.dumps(data, indent=2)}")
        except Exception:
            LOGGER.error(f"Error processing message: {json.dumps(data, indent=2)}")
            LOGGER.error(f"{traceback.format_exc()}")

    def _send(self, data):
        """Send a message to the Matter service"""
        if not self.matterConnected.is_set():
            LOGGER.error("Not connected to socket - Can't send a message")
            return False

        try:
            message = json.dumps(data).encode()
            self.matterServiceSocket.sendall(message)
            return True
        except Exception:
            LOGGER.error(f"Error sending message: {traceback.format_exc()}")

    def _enableMatter(self):
        """ Tells the matter service to enable the bridge and set GV0 to 1 """
        if self.matterConnected.is_set():
            self._send({
                'type': 'command',
                'command': 'start'
            })
            self.matterEnabled.set()
            self.controller.setDriver('GV0', 1, True, True)
            LOGGER.info('Matter is enabled')

    def _disableMatter(self):
        """ Tells the matter service to disable the bridge and set GV0 to 0 """
        self.controller.setDriver('GV0', 0, True, True)
        self.matterEnabled.clear()

        if self.matterConnected.is_set():
            self._send({
                'type': 'command',
                'command': 'stop'
            })
            LOGGER.info('Matter is disabled')
        else:
            LOGGER.info('Matter service is not connected - Can\'t send stop command')

    def stop(self):
        """Stop the matter connection"""
        self._disableMatter()
        # This makes the loop stop
        self.running = False
        if self.matterServiceSocket:
            self.matterServiceSocket.close()
        if self.matterServiceThread:
            self.matterServiceThread.join()



if __name__ == "__main__":
    try:
        polyglot = Interface([])
        polyglot.start({ 'version': '1.0.0', 'requestId': True })

        # Show the help in PG3 UI under the node's Configuration option
        polyglot.setCustomParamsDoc()
        # Update the profile files
        polyglot.updateProfile()    # Use checkProfile() instead?

        # Create the controller node
        controller = Controller(polyglot, 'controller', 'controller', 'Matter')

        matter = Matter(polyglot, controller, '/tmp/ns2matter')
        matter.start()

        def stopHandler():
            matter.stop()
            polyglot.stop()

        # subscribe to the events we want
        polyglot.subscribe(polyglot.STOP, stopHandler)

        # We can start receive events
        polyglot.ready()

        # Just sit and wait for events
        polyglot.runForever()

    except (KeyboardInterrupt, SystemExit):
        sys.exit(0)

    except Exception:
        LOGGER.error(f"Error starting Matter: {traceback.format_exc()}")
        polyglot.stop()
