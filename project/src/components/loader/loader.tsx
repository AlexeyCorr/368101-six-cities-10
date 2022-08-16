import './style.css';

export function Loader(): JSX.Element {
  return (
    <div className='loader'>
      <svg
        className='loader__svg'
        width="66"
        height="66"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className='loader__circle'
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </div>
  );
}
