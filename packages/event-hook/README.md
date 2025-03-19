# Install

```shell
npm install @basic-plugins/event-hook
```

# Create EventHook

```typescript
import {EventHook} from "@basic-plugins/event-hook";

const hook = new EventHook();
```

# On EventHook

```typescript
hook.on('refresh', function onRefresh() {
    console.log('refresh', e);
});
```

# Off EventHook

```typescript
hook.off('refresh', onRefresh);
```

# Trigger EventHook

```typescript
hook.trigger('refresh', 'success');
```

# Destroy EventHook

```typescript
hook.destroy();
```
