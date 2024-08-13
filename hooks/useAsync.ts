import { useCallback, useState } from "react";

export const useAsync = <T>(asyncFunction: (...args: any[]) => Promise<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [result, setResult] = useState<T | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        const response = await asyncFunction(...args);
        setResult(response);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { error, result, loading, execute };
};

// using
// export default function Client() {
//   const { loading, result, error, execute } = useAsync({
//     asyncFunction: someAsyncTask,
//   });

//   async function someAsyncTask() {
//     // perform async task
//   }

//   const handleClick = () => {
//     execute();
//   };

//   return (
//     <div>
//       {loading && <p>loading</p>}
//       {!loading && result && <p>{result}</p>}
//       {!loading && error?.message && <p>{error?.message}</p>}
//       <button onClick={handleClick} />
//     </div>
//   );
// }
