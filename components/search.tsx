"use client";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";

// const searchClient = algoliasearch('undefined', 'undefined');

function Hit({ hit }: any) {
  return (
    <article>
      <p>{hit.title}</p>
      <h1>{hit.description}</h1>
    </article>
  );
}

export function Search() {
  return (
    <>
      <SearchBox />
      <Hits hitComponent={Hit} />
    </>
  );
}
