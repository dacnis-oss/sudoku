#! /bin/bash
for a in `seq 1 3`
do	
	str=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 5 | head -n 1)
	redis-cli set $str $(($RANDOM % 10000))
done
