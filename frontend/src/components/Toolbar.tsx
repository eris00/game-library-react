import type { RootState } from "../store/store";
import { setSearch, setSort } from "../store/slices/gamesSlice";
import { useDispatch, useSelector } from "react-redux";

const Toolbar = () => {

  const dispatch = useDispatch();
  const { search, sortBy, order } = useSelector((state: RootState) => state.games);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split("-");
    dispatch(setSort({ sortBy, order: order as "asc" | "desc" }));
  };

  return (
  <div className="w-full flex flex-col items-center my-10">
    <div className="flex flex-wrap gap-4 justify-center items-end bg-gray-800 p-4 rounded-2xl shadow-md max-w-3xl w-full">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={handleSearch}
        className="px-4 py-2 rounded-xl bg-gray-900 text-yellow-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition w-64"
      />

      {/* SORT */}
      <select
        value={`${sortBy}-${order}`}
        onChange={handleSort}
        className="px-4 py-2 rounded-xl bg-gray-900 text-yellow-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      >
        <option value="price-asc">Price (low-high)</option>
        <option value="price-desc">Price (high-low)</option>
        <option value="title-asc">Title (A-Z)</option>  
      </select>
    </div>
  </div>
  )
}

export default Toolbar