# CO₂ Emissions App

## Performance Profiling

### Initial Profiling with React Dev Tools Profiler (Before optimization)

#### Column selection

Commit Duration: 1.6s
Render Duration: 88.4ms
Interactions: CountryList

Flame Graph:
![Flame Graph](/docs/column-selection-flamegraph-before.png)

Ranked Chart:
![Ranked Chart](/docs/column-selection-ranked-before.png)

#### Sort by name

Commit Duration: 2.1s
Render Duration: 78.4ms
Interactions: CountryList

Flame Graph:
![Flame Graph](/docs/sort-by-name-flamegraph-beforee.png)

Ranked Chart:
![Ranked Chart](/docs/sort-by-name-ranked-before.png)

#### Year selection

Commit Duration: 2s
Render Duration: 89.7ms
Interactions: CountryList

Flame Graph:
![Flame Graph](/docs/year-selection-flamegraph-before.png)

Ranked Chart:
![Ranked Chart](/docs/year-selection-ranked-efore.png)

#### Country search

Commit Duration: 1.8s
Render Duration: 53.8ms
Interactions: CountryList

Flame Graph:
![Flame Graph](/docs/country-search-flamegraph-before.png)

Ranked Chart:
![Ranked Chart](/docs/country-search-ranked-before.png)

### Update the App with React.memo and useMemo (After optimization)

#### Column selection

Commit Duration: 1.6s
Render Duration: 5.8ms
Interactions: CountryList

Flame Graph:
![Flame Graph](/docs/column-selection-flamegraph-after.png)

Ranked Chart:
![Ranked Chart](/docs/column-selection-ranked-after.png)

#### Sort by name

Commit Duration: 2.1s
Render Duration: 16.5ms
Interactions: CountryList

Flame Graph:
![Flame Graph](/docs/sort-by-name-flamegraph-after.png)

Ranked Chart:
![Ranked Chart](/docs/sort-by-name-ranked-after.png)

#### Year selection

Commit Duration: 1.5s
Render Duration: 100.7ms
Interactions: CountryList

Flame Graph:
![Flame Graph](/docs/year-selection-flamegraph-after.png)

Ranked Chart:
![Ranked Chart](/docs/year-selection-ranked-after.png)

#### Country search

Commit Duration: 2.2s
Render Duration: 21ms
Interactions: CountryList

Flame Graph:
![Flame Graph](/docs/country-search-flamegraph-after.png)

Ranked Chart:
![Ranked Chart](/docs/country-search-ranked-after.png)
