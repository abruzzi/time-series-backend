#!/bin/bash

ruby campaign-access-simulation.rb | grep "campaigns" | node normalize-log-raw.js
