import iconSearch from "@/assets/icon-search.svg";

const SearchSection = () => {
  return (
    <section className="search-section">
      <div className="search-section_left">
        <img
          className="search-section_icon"
          src={iconSearch.src}
          alt="icon-search"
        />

        <input
          className="search-section_input"
          type="text"
          placeholder="Search Github username..."
        />
      </div>
      <button className="search-section_btn">Search</button>
    </section>
  );
};

export default SearchSection;
