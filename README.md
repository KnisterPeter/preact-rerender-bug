# preact-rerender-bug

This shows a bug (or at least difference) between preact and react.

While using react, the `div` node rendered by the plugin keeps mounted even if its props changes, preact
remounts it which will result in remounting the included child.

This will have many lifecycle sideeffects different from react.
