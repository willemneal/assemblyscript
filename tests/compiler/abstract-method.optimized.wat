(module
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$viiii (func (param i32 i32 i32 i32)))
 (type $FUNCSIG$v (func))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (memory $0 1)
 (data (i32.const 8) "$\00\00\00\01\00\00\00\01\00\00\00$\00\00\00a\00b\00s\00t\00r\00a\00c\00t\00-\00m\00e\00t\00h\00o\00d\00.\00t\00s")
 (global $~lib/rt/stub/startOffset (mut i32) (i32.const 0))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $abstract-method/aastract (mut i32) (i32.const 0))
 (export "memory" (memory $0))
 (start $start)
 (func $~lib/rt/stub/maybeGrowMemory (; 1 ;) (type $FUNCSIG$vi) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  memory.size
  local.tee $2
  i32.const 16
  i32.shl
  local.tee $1
  i32.gt_u
  if
   local.get $2
   local.get $0
   local.get $1
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $1
   local.get $2
   local.get $1
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $1
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $0
  global.set $~lib/rt/stub/offset
 )
 (func $~lib/rt/stub/__alloc (; 2 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/rt/stub/offset
  i32.const 16
  i32.add
  local.tee $2
  i32.const 16
  i32.add
  call $~lib/rt/stub/maybeGrowMemory
  local.get $2
  i32.const 16
  i32.sub
  local.tee $1
  i32.const 16
  i32.store
  local.get $1
  i32.const -1
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $1
  i32.const 4
  i32.store offset=12
  local.get $2
 )
 (func $abstract-method/testAbstract (; 3 ;) (param $0 i32)
  local.get $0
  i32.const 8
  i32.sub
  i32.load
  i32.const 4
  i32.eq
  if (result i32)
   local.get $0
   i32.load
  else
   unreachable
  end
  i32.const 42
  i32.ne
  if
   i32.const 0
   i32.const 24
   i32.const 19
   i32.const 2
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 8
  i32.sub
  i32.load
  i32.const 4
  i32.eq
  if (result i32)
   local.get $0
   i32.load
   i32.const 1
   i32.shl
  else
   unreachable
  end
  i32.const 84
  i32.ne
  if
   i32.const 0
   i32.const 24
   i32.const 20
   i32.const 2
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $start (; 4 ;) (type $FUNCSIG$v)
  (local $0 i32)
  i32.const 64
  global.set $~lib/rt/stub/startOffset
  i32.const 64
  global.set $~lib/rt/stub/offset
  i32.const 4
  call $~lib/rt/stub/__alloc
  local.tee $0
  i32.eqz
  if
   i32.const 3
   call $~lib/rt/stub/__alloc
   local.set $0
  end
  local.get $0
  i32.const 42
  i32.store
  local.get $0
  global.set $abstract-method/aastract
  global.get $abstract-method/aastract
  call $abstract-method/testAbstract
 )
 (func $null (; 5 ;) (type $FUNCSIG$v)
  unreachable
 )
)
