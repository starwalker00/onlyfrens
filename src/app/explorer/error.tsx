// error.js
type Props = {
    error: { message: string },
    reset: () => void
};
export default function Error({ error, reset }: Props) {
    return (
        <>
            An error occurred: {error.message}
            <button onClick={() => reset()}>Try again</button>
        </>
    );
}