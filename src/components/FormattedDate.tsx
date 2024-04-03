export default function FormattedDate(props: {date: string}) {
  if (!props.date) return null;
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(props.date).toLocaleDateString('en-GB', options);

  return (
    <span className='date'>
      {date}
    </span>
  )
}