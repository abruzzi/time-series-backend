#!/bin/bash

ssh airport-pd-wifi-portal-host tail -f /var/jcdecaux/logs/wifi-portal/wifi-portal-2018-05-31-access.log | grep "campaigns" | node normalize-log-raw.js
