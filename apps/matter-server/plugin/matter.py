#!/usr/bin/env python3

"""
Polyglot v3 plugin - Matter server
Copyright (C) 2025 Universal Devices

MIT License
"""

# https://github.com/UniversalDevicesInc/udi_python_interface/blob/master/API.md

import sys
import traceback
from udi_interface import LOGGER, Interface, Node

class Controller(Node):
    # nodedef id
    id = 'CTL'

    drivers = [
        # Default value is "Online"
        { 'driver': 'ST', 'value': 1, 'uom': 25 },
    ]

    def __init__(self, polyglot, parent, address, name):
        super(Controller, self).__init__(polyglot, parent, address, name)

        polyglot.addNode(self, conn_status='ST')

        LOGGER.info('Controller Initialized...')

    # The commands here need to match what is in the nodedef profile file.
    commands = {}


polyglot = None

def configDoneHandler():
    polyglot.Notices.clear()


def stopHandler():
    polyglot.stop()


if __name__ == "__main__":
    try:
        polyglot = Interface([])
        polyglot.start({ 'version': '1.2.1', 'requestId': True })

        # Show the help in PG3 UI under the node's Configuration option
        polyglot.setCustomParamsDoc()
        # Update the profile files
        polyglot.updateProfile()    # Use checkProfile() instead?

        # Create the controller node
        controller = Controller(polyglot, 'controller', 'controller', 'Matter')

        # subscribe to the events we want
        polyglot.subscribe(polyglot.STOP, stopHandler)
        polyglot.subscribe(polyglot.CONFIGDONE, configDoneHandler)

        # We can start receive events
        polyglot.ready()

        # Just sit and wait for events
        polyglot.runForever()

    except (KeyboardInterrupt, SystemExit):
        sys.exit(0)

    except Exception:
        LOGGER.error(f"Error starting Matter: {traceback.format_exc()}")
        polyglot.stop()
