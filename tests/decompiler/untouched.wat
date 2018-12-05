(module
 (type $iii (func (param i32 i32) (result i32)))
 (type $ii (func (param i32) (result i32)))
 (type $iiv (func (param i32 i32)))
 (type $iv (func (param i32)))
 (type $v (func))
 (import "index" "println" (func $index/println (param i32)))
 (memory $0 0)
 (table $0 1 anyfunc)
 (elem (i32.const 0) $null)
 (global $~lib/internal/allocator/AL_BITS i32 (i32.const 3))
 (global $~lib/internal/allocator/AL_SIZE i32 (i32.const 8))
 (global $~lib/internal/allocator/AL_MASK i32 (i32.const 7))
 (global $~lib/internal/allocator/MAX_SIZE_32 i32 (i32.const 1073741824))
 (global $~lib/allocator/arena/startOffset (mut i32) (i32.const 0))
 (global $~lib/allocator/arena/offset (mut i32) (i32.const 0))
 (global $index/t (mut i32) (i32.const 0))
 (global $index/t2 (mut i32) (i32.const 0))
 (global $HEAP_BASE i32 (i32.const 8))
 (export "memory" (memory $0))
 (export "table" (table $0))
 (export "Test#constructor" (func $index/Test#constructor))
 (export "Test#get:i" (func $Test#get:i))
 (export "Test#set:i" (func $Test#set:i))
 (export "Test#_if" (func $index/Test#_if))
 (export "Test#_else" (func $index/Test#_else))
 (export "Test#_while" (func $index/Test#_while))
 (export "Test#_doWhile" (func $index/Test#_doWhile))
 (start $start)
 (func $~lib/allocator/arena/__memory_allocate (; 1 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  get_local $0
  get_global $~lib/internal/allocator/MAX_SIZE_32
  i32.gt_u
  if
   unreachable
  end
  get_global $~lib/allocator/arena/offset
  set_local $1
  get_local $1
  get_local $0
  tee_local $2
  i32.const 1
  tee_local $3
  get_local $2
  get_local $3
  i32.gt_u
  select
  i32.add
  get_global $~lib/internal/allocator/AL_MASK
  i32.add
  get_global $~lib/internal/allocator/AL_MASK
  i32.const -1
  i32.xor
  i32.and
  set_local $4
  current_memory
  set_local $5
  get_local $4
  get_local $5
  i32.const 16
  i32.shl
  i32.gt_u
  if
   get_local $4
   get_local $1
   i32.sub
   i32.const 65535
   i32.add
   i32.const 65535
   i32.const -1
   i32.xor
   i32.and
   i32.const 16
   i32.shr_u
   set_local $2
   get_local $5
   tee_local $3
   get_local $2
   tee_local $6
   get_local $3
   get_local $6
   i32.gt_s
   select
   set_local $3
   get_local $3
   grow_memory
   i32.const 0
   i32.lt_s
   if
    get_local $2
    grow_memory
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  get_local $4
  set_global $~lib/allocator/arena/offset
  get_local $1
 )
 (func $~lib/memory/memory.allocate (; 2 ;) (type $ii) (param $0 i32) (result i32)
  get_local $0
  call $~lib/allocator/arena/__memory_allocate
  return
 )
 (func $index/Test#constructor (; 3 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  get_local $0
  if (result i32)
   get_local $0
  else   
   block (result i32)
    i32.const 4
    call $~lib/memory/memory.allocate
    set_local $2
    get_local $2
    get_local $1
    i32.store
    get_local $2
   end
   tee_local $0
  end
  tee_local $0
 )
 (func $index/Test#_if (; 4 ;) (type $iiv) (param $0 i32) (param $1 i32)
  get_local $0
  i32.load
  get_local $1
  i32.lt_s
  if
   get_local $0
   get_local $1
   i32.store
  end
 )
 (func $index/Test#_else (; 5 ;) (type $iiv) (param $0 i32) (param $1 i32)
  get_local $0
  i32.load
  get_local $1
  i32.lt_s
  if
   get_local $0
   get_local $1
   i32.store
  else   
   get_local $0
   get_local $0
   i32.load
   i32.const 1
   i32.add
   i32.store
  end
 )
 (func $index/Test#_while (; 6 ;) (type $iiv) (param $0 i32) (param $1 i32)
  loop $continue|0
   get_local $0
   i32.load
   get_local $1
   i32.gt_s
   if
    get_local $0
    get_local $0
    i32.load
    i32.const 1
    i32.sub
    i32.store
    br $continue|0
   end
  end
 )
 (func $index/Test#_doWhile (; 7 ;) (type $iiv) (param $0 i32) (param $1 i32)
  loop $continue|0
   get_local $0
   i32.load
   get_local $1
   i32.lt_s
   if
    get_local $0
    get_local $0
    i32.load
    i32.const 1
    i32.add
    i32.store
   end
   i32.const 1
   br_if $continue|0
  end
 )
 (func $start (; 8 ;) (type $v)
  get_global $HEAP_BASE
  get_global $~lib/internal/allocator/AL_MASK
  i32.add
  get_global $~lib/internal/allocator/AL_MASK
  i32.const -1
  i32.xor
  i32.and
  set_global $~lib/allocator/arena/startOffset
  get_global $~lib/allocator/arena/startOffset
  set_global $~lib/allocator/arena/offset
  i32.const 0
  i32.const 0
  call $index/Test#constructor
  set_global $index/t
  i32.const 0
  i32.const 0
  call $index/Test#constructor
  set_global $index/t2
  get_global $index/t
  i32.const 1
  call $index/Test#_if
  get_global $index/t
  i32.const 3
  call $index/Test#_else
  get_global $index/t
  i32.load
  call $index/println
  get_global $index/t
  i32.const 1
  call $index/Test#_while
  get_global $index/t
  i32.load
  call $index/println
 )
 (func $null (; 9 ;) (type $v)
 )
 (func $Test#get:i (; 10 ;) (type $ii) (param $0 i32) (result i32)
  get_local $0
  i32.load
 )
 (func $Test#set:i (; 11 ;) (type $iiv) (param $0 i32) (param $1 i32)
  get_local $0
  get_local $1
  i32.store
 )
)
