"use client";
import { liteClient as algoliasearch } from "algoliasearch/lite";

import { InstantSearch } from "react-instantsearch";

const AlgoliaClient = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const searchClient = algoliasearch(
    "QA6WH28718",
    "2a03c7dd2c25cfe32114922e2bde98df"
  );
  return (
    <InstantSearch searchClient={searchClient} indexName="blogs">
      {children}
    </InstantSearch>
  );
};
export default AlgoliaClient;
