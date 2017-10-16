# 使用方法

本例将会以 **TypeScript** 用法作为标准

## 语法

### 基本用法

```typescript
import moer, { Element, connect, Types } from 'moer'

@connect // 只有用到全局store的时候才用
class Index extends Element<void> {
  store: { str: string }
  render (d: Types) {
    return () => {
      d.div({ className: 'red' }); {
        'Hello World!'
        d.span(); `${this.store.str}`
      }
    }
  }
}

moer({ node: new Index(), data: { str: 'Moer.js' } })
```

### 组件化

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

### 条件渲染

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

### Class 与 Style

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

### 事件 与 innerHTML

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

### 循环渲染

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

### Switch 语句

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

### 单次渲染

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

## 其它

### State

```typescript
import moer, { Element, Types } from 'moer'

class Index extends Element<void> {
  state = { value: '' }
  render (d: Types) {
    return () => {
      d.div(); {
        d.input({
          value: this.state.value,
          onInput: ({ target: { value } }) => (this.state.value = value)
        }); {}
      }
    }
  }
}
```

### Modal 与 插件

```typescript
import moer, { Element, Types } from 'moer'

const sleep = time => new Promise(resolve => setTimeout(resolve, time || 0))
class Model {
  name = 'model'
  state = { times: 0 }
  constructor (plugins: any) {
    this.router = plugins.router
  }
  async add () {
    await sleep(1000)
    this.state.times++
    // await fetch('data.json')
  }
  jump () {
    this.router.push('/login')
  }
}

class Router () {
  onSetup (plugins) {
    plugins.router = this
  }
  push (path) {
    window.location.hash = path
  }
}

class Index extends Element<void> {
  models: { model: Model }
  render (d: Types) {
    return () => {
      d.div(); {
        d.a({ onClick: () => this.models.model.jump() }); 'jump'
        d.button({ onClick: () => this.models.model.add() }); `${this.models.model.state.times}`
      }
    }
  }
}

moer({ node: new Index(), plugins: [new Plugin()], models: [Model] })
```
