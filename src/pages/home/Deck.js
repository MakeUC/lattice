import React, { useState } from 'react';
import { useSprings } from 'react-spring/hooks';
import { useGesture } from 'react-with-gesture';

import { useMatch } from '../../providers/MatchProvider';
import { useProfileList } from '../../providers/ProfileListProvider';
import Card from './Card';
import '../../styles/Deck.css';

const to = (i) => ({
  x: 0,
  y: i * -3,
  scale: 1,
  rot: -5 + Math.random() * 10,
  delay: i * 100,
});

const from = (i) => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(10deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function Deck({ data }) {
  const { getProfiles } = useProfileList();
  const { swipeProfile } = useMatch();

  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const onSwipe = async (profile, direction) => {
    await swipeProfile(profile, (direction === 1));
  };

  const onFinish = () => {
    console.log(`onFinish: End of cards`);
    getProfiles();
  };

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      let swipePromise = null;

      if (!down && trigger) {
        swipePromise = onSwipe(data[index], dir).then(() => console.log(`swiped`));
        gone.add(index);
      }

      set((i) => {
        if (index !== i) {
          return;
        }

        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === data.length) {
        swipePromise?.then(onFinish);   // eslint-disable-line no-unused-expressions
        // setTimeout(() => gone.clear() || set((i) => to(i)), 600);
      }
    }
  );

  return <div className="deck" style={{ position: `fixed` }}>
    {props.map(({ x, y, rot, scale }, i) => (
      <Card
        key={i}
        i={i}
        x={x}
        y={y}
        rot={rot}
        scale={scale}
        trans={trans}
        data={data}
        bind={bind}
      />
    ))}
  </div>;
}

export default Deck;
