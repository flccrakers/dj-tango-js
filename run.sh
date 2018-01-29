#!/bin/sh
# add as many pyuic4 convenstion that needed to create the project
#
curdir=$(pwd "$0")
dataserver=$curdir'/dataserver'
ihm=$curdir'/IHM'
bin=$curdir'bin'
echo $dataserver
cd dataserver
#cmd='cd '$dataserver' && npm install && npm run start'
#echo 'cd '$dataserver' && npm install && npm run start'
#gnome-terminal -e '"npm install && npm run start;read"'
npm run start &
cd ihm
#echo "I'm in IHM dir"
npm install && npm start &
