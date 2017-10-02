# 语法

本例将会以 **TypeScript** 用法作为标准

## 基本用法

```typescript
import moer, { Element, Types } from 'moer'

class Index extends Element<void> {
  render (d: Types) {
    return () => {
      d.div({ className: 'red' }); {
        'Hello World!'
      }
    }
  }
}

moer({ node: new Index() })
```

## 条件渲染

```typescript
import { Element, Types } from 'moer'

const var1 = 1 === 2
class Index extends Element<void> {
  render (d: Types) {
    return () => {
      d.div(); {
        if (var1) {
          '1 === 2'
        } else {
          '1 !== 2'
        }
      }
    }
  }
}
```

## 循环渲染

> 支持 For-Of, For-In, While, Do-While 等语句

```typescript
import { Element, Types } from 'moer'

const arr = ['a', 'b', 'c']
class Index extends Element<void> {
  render (d: Types) {
    return () => {
      d.div(); {
        for (const i of arr) {
          `${i}`
        }
      }
    }
  }
}
```


## Switch 语句

```typescript
import { Element, Types } from 'moer'

const test = 'test'
class Index extends Element<void> {
  render (d: Types) {
    return () => {
      d.div(); {
        switch (test) {
          case 'a':
          case 'test':
            d.p(); 'test'
            break
          default: 'notest'
        }
      }
    }
  }
}
```
