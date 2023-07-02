import Link from 'next/link'

export default function TestPage() {
  return (
    <div>
      <Link href='/'>
        <p>테스트</p>
      </Link>
    </div>
  );
}
