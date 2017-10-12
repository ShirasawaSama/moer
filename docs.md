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

## 组件化

```typescript
import { Element, Types } from 'moer'

interface TextProps { name: string }
class Text extends Element<TextProps> {
  children: string
  render (d: Types) {
    return () => {
      d.div({ className: this.props.name }); this.children
    }
  }
}

class Index extends Element<void> {
  render () {
    return () => {
      new Text({ name: 'text' }); 'Hello Wolrd'
    }
  }
}
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

## Class 与 Style

```typescript
import { Element, Types } from 'moer'
import styles from './style.less'

const var1 = 1 === 2
class Index extends Element<void> {
  render (d: Types) {
    return () => {
      d.div({ className: [var1 && 'red', 'text'] }); { // 数组类型
        d.span({ className: { green: var1, [styles.hidden]: false } }); 123 // 对象类型
        d.span({ className: 'row col-3' }); 456 // 文本类型

        d.span({ style: { fontSize: 60 } }); 789
        d.span({ style: 'padding: 40px' }); 666
      }
    }
  }
}
```

## 事件 与 innerHTML

```typescript
import { Element, Types } from 'moer'

class Index extends Element<void> {
  render (d: Types) {
    return () => {
      d.div(); {
        d.button({ onClick: () => alert('Clicked') }); 'click me!'
        d.input({ onInput: ({ target: { value } }) => alert(value) }); {}

        d.span({ innerHTML: '<div>innerHTML has been set</div>' }); {}
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
          d.span({ key: i }); `${i}` // 注意: 必须要设置 Key, 且 Key 只能唯一 !!
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

## 单次渲染

> 如果数据极大时可以用此方法来减少对比时间

```typescript
import { Element, Types } from 'moer'

class Index extends Element<void> {
  render (d: Types) {
    return () => {
      d.div({ once: true }); 'Hello World' // 设置 once 为 true
    }
  }
}
```
