import skillCoinNew from '../assets/skillcoin-new.png';
import robuxGold from '../assets/robux-gold.png';

export function SkillCoin({ size = 28 }: { size?: number }) {
  return (
    <img
      src={skillCoinNew}
      width={size}
      height={size}
      alt="SkillCoin"
      style={{ objectFit: 'contain', display: 'inline-block', borderRadius: '50%' }}
    />
  );
}

export function RobuxIcon({ size = 48 }: { size?: number }) {
  return (
    <img
      src={robuxGold}
      width={size}
      height={size}
      alt="Robux"
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}

export function RobuxBadge({ size = 20 }: { size?: number }) {
  return (
    <img
      src={robuxGold}
      width={size}
      height={size}
      alt="R$"
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}
