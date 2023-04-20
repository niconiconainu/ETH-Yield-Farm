#!/bin/bash

expect -c "
 spawn truffle develop
 expect truffle(develop)>
 send \"truffle test\n\"

 expect truffle(develop)>
 send \".exit\n\"
 interact
"> yield-farm-test.txt

grep -n '5 passing' yield-farm-test.txt

# truffle test
