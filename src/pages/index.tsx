import SearchSection from "@/components/SearchSection/SearchSection";
import InfoCard from "@/components/InfoCard/InfoCard";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [result, setResult] = useState({});
  const [displayInfoCard, setDisplayInfoCard] = useState<boolean>(false);
  const handleSearch = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      // console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setResult(data);
        setDisplayInfoCard(true);
      } else {
        setDisplayInfoCard(false);
        setResult({});
      }

      // setDisplayInfoCard(true);
    } catch (error) {
      setDisplayInfoCard(false);
      console.log("displayInfoCard", displayInfoCard);
    }
  };
  return (
    <main>
      <div className="home__container">
        <section className="navbar">
          <h1 className="navbar__title">devfinder</h1>
          <button className="navbar__btn">LIGHT</button>
        </section>
        <SearchSection
          onChange={(e) => setUsername(e.target.value)}
          onClick={handleSearch}
        />
        {displayInfoCard && (
          <InfoCard
            src={result?.avatar_url}
            name={result?.name}
            href={result?.html_url}
            date={result?.updated_at}
            bio={result?.bio}
            repo={result?.public_repos}
            followers={result?.followers}
            following={result?.following}
            location={result?.location}
            blog={result?.blog}
            twitter={result?.twitter_username}
            company={result?.company}
            userName={result?.login}
          />
        )}
        {username && !displayInfoCard && (
          <div className="error">User not found</div>
        )}
      </div>
    </main>
  );
}
