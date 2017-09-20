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
