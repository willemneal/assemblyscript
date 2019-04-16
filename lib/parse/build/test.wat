(module
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$i (func (result i32)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (import "host" "_log_str" (func $../host/assembly/host/_log_str (param i32)))
 (memory $0 1)
 (data (i32.const 8) "\10\00\00\00T\00h\00i\00s\00 \00i\00s\00 \00a\00 \00s\00t\00r\00i\00n\00g\00")
 (data (i32.const 48) "\1b\00\00\00N\00o\00w\00 \00t\00h\00e\00 \00s\00t\00r\00i\00n\00g\00 \00h\00a\00s\00 \00c\00h\00a\00n\00g\00e\00d\00.\00")
 (table $0 1 funcref)
 (elem (i32.const 0) $null)
 (global $~lib/allocator/arena/startOffset (mut i32) (i32.const 0))
 (global $~lib/allocator/arena/offset (mut i32) (i32.const 0))
 (global $tests/assembly/index/str (mut i32) (i32.const 8))
 (global $~lib/memory/HEAP_BASE i32 (i32.const 108))
 (export "memory" (memory $0))
 (export "table" (table $0))
 (export "startUp" (func $tests/assembly/index/startUp))
 (export "overwrite" (func $tests/assembly/index/overwrite))
 (export "getStr" (func $tests/assembly/index/getStr))
 (export "memory.compare" (func $~lib/memory/memory.compare))
 (export "memory.allocate" (func $~lib/memory/memory.allocate))
 (export "memory.free" (func $~lib/memory/memory.free))
 (export "memory.reset" (func $~lib/memory/memory.reset))
 (start $start)
 (func $start:~lib/allocator/arena (; 1 ;) (type $FUNCSIG$v)
  global.get $~lib/memory/HEAP_BASE
  i32.const 7
  i32.add
  i32.const 7
  i32.const -1
  i32.xor
  i32.and
  global.set $~lib/allocator/arena/startOffset
  global.get $~lib/allocator/arena/startOffset
  global.set $~lib/allocator/arena/offset
 )
 (func $start:tests/assembly/index (; 2 ;) (type $FUNCSIG$v)
  call $start:~lib/allocator/arena
 )
 (func $../host/assembly/index/log<String> (; 3 ;) (type $FUNCSIG$vi) (param $0 i32)
  local.get $0
  call $../host/assembly/host/_log_str
 )
 (func $tests/assembly/index/startUp (; 4 ;) (type $FUNCSIG$v)
  i32.const 48
  global.set $tests/assembly/index/str
  global.get $tests/assembly/index/str
  call $../host/assembly/index/log<String>
 )
 (func $tests/assembly/index/overwrite (; 5 ;) (type $FUNCSIG$v)
  global.get $tests/assembly/index/str
  i32.const 2
  i32.add
  i32.const 0
  i32.store
  global.get $tests/assembly/index/str
  i32.const 3
  i32.add
  i32.const 0
  i32.store
  global.get $tests/assembly/index/str
  i32.const 4
  i32.add
  i32.const 0
  i32.store
  global.get $tests/assembly/index/str
  call $../host/assembly/index/log<String>
 )
 (func $tests/assembly/index/getStr (; 6 ;) (type $FUNCSIG$i) (result i32)
  global.get $tests/assembly/index/str
 )
 (func $~lib/internal/memory/memcmp (; 7 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  local.get $0
  local.get $1
  i32.eq
  if
   i32.const 0
   return
  end
  block $break|0
   loop $continue|0
    local.get $2
    i32.const 0
    i32.ne
    local.tee $3
    if (result i32)
     local.get $0
     i32.load8_u
     local.get $1
     i32.load8_u
     i32.eq
    else     
     local.get $3
    end
    if
     block
      local.get $2
      i32.const 1
      i32.sub
      local.set $2
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      i32.const 1
      i32.add
      local.set $1
     end
     br $continue|0
    end
   end
  end
  local.get $2
  if (result i32)
   local.get $0
   i32.load8_u
   local.get $1
   i32.load8_u
   i32.sub
  else   
   i32.const 0
  end
 )
 (func $~lib/memory/memory.compare (; 8 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  local.get $1
  local.get $2
  call $~lib/internal/memory/memcmp
 )
 (func $~lib/allocator/arena/__memory_allocate (; 9 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  i32.const 1073741824
  i32.gt_u
  if
   unreachable
  end
  global.get $~lib/allocator/arena/offset
  local.set $1
  local.get $1
  local.get $0
  local.tee $2
  i32.const 1
  local.tee $3
  local.get $2
  local.get $3
  i32.gt_u
  select
  i32.add
  i32.const 7
  i32.add
  i32.const 7
  i32.const -1
  i32.xor
  i32.and
  local.set $4
  current_memory
  local.set $5
  local.get $4
  local.get $5
  i32.const 16
  i32.shl
  i32.gt_u
  if
   local.get $4
   local.get $1
   i32.sub
   i32.const 65535
   i32.add
   i32.const 65535
   i32.const -1
   i32.xor
   i32.and
   i32.const 16
   i32.shr_u
   local.set $2
   local.get $5
   local.tee $3
   local.get $2
   local.tee $6
   local.get $3
   local.get $6
   i32.gt_s
   select
   local.set $3
   local.get $3
   grow_memory
   i32.const 0
   i32.lt_s
   if
    local.get $2
    grow_memory
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $4
  global.set $~lib/allocator/arena/offset
  local.get $1
 )
 (func $~lib/memory/memory.allocate (; 10 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/allocator/arena/__memory_allocate
  return
 )
 (func $~lib/allocator/arena/__memory_free (; 11 ;) (type $FUNCSIG$vi) (param $0 i32)
  nop
 )
 (func $~lib/memory/memory.free (; 12 ;) (type $FUNCSIG$vi) (param $0 i32)
  local.get $0
  call $~lib/allocator/arena/__memory_free
  return
 )
 (func $~lib/allocator/arena/__memory_reset (; 13 ;) (type $FUNCSIG$v)
  global.get $~lib/allocator/arena/startOffset
  global.set $~lib/allocator/arena/offset
 )
 (func $~lib/memory/memory.reset (; 14 ;) (type $FUNCSIG$v)
  call $~lib/allocator/arena/__memory_reset
  return
 )
 (func $start (; 15 ;) (type $FUNCSIG$v)
  call $start:tests/assembly/index
 )
 (func $null (; 16 ;) (type $FUNCSIG$v)
 )
)
