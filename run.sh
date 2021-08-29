#!/bin/sh
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
echo $ihm
cd $ihm && npm run start &

#echo "I'm in IHM dir"
#npm install && npm start &
