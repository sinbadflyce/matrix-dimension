Personal fork not to use riot jitsi
```sh
sed -i -re "s/jitsi.riot.im/meet.jit.si/g" $(find  .  -type f |grep -v .git)
```
