
import React from 'react';
module.exports = new Proxy({}, {
  get: (target, name) => {
    return () => React.createElement('i', { className: name });
  }
});
