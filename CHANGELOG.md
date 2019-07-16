CHANGELOG
=========

## 2019-04-24

### 1. Performance improvement for route calculation
#### Update route calculation algorithm
Instead of calculating the route using a point, we calculate
the route based on distance first, then use the last point of
the route as the courier's location. This improves the
performance of calculation significantly. From around 500ms
per cycle(calculating all delivering orders route and position)
to around 50ms.

#### Increate animation interval
Increate the animation interval from 150ms to 500ms. Frequent
recalculating consumes a lot of CPU/GPU, and any delay in one
specific setInterval will be delayed even more. Given a little
bit extra time for the calculation.

### 2. Fix a small issue when switching from About to Home page back and forth.
Rerendering the component won't trigger startSimulatingOrders again.


