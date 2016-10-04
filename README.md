## Spince Search

Spince Search is a free tool that provides enhanced search results for Google and Bing queries.

![alt text](http://search.spince.com/img/basquiatGoogle.gif "Demo")

## Installation

You can install Spince Search from the Chrome Web Store via <https://chrome.google.com/webstore/detail/spince-search/okhkfjjedepjhnfodgppdcphcmblkpjj/>

## Features

The tool enhances your search results by providing an extra level of analysis on top of Google and Bing searches. With Spince, you can rank your results by fewest advertisements or you can see the technical frameworks behind each result.

<ul>
<li>Summary snapshot view of a search result</li>
<li>Snapshot includes a list of site frameworks</li>
<li>Snapshot also includes component counts</li>
<li>TF algorithm extracts a key sentence</li>
<li>Rank the results by fewest ads</li>
<li>Rank by text %, video, or image count</li>
<li>Rank results by script or link count</li>
<li>Runs on Google and Bing search engines</li>										
<li>Doesn't run on non-search pages</li>										
<li>Exclude any link to prevent analysis</li>                    					
<li>Minimal bandwidth footprint (KBs)</li>					
<li>Standalone API under development</li>					
<li>No browsing data sent to Spince</li>
<li>Open source code on github</li>
</ul>

## Usage Tips

Spince ships with a whitelist that prevents the tool from running on non-search sites. You will see the icon on the toolbar turn red when the extension is running. Clicking on the toobar icon will also a display a menu where you can choose your ranking criteria. The default rank order is by fewest ads. So the result with a number 1 indicates the result with the fewest ads.

You can also prevent a single link from being analyzed within a page. To prevent a link from being analyzed, you would click the Manage Links button from the Spince icon popup. When prompted you enter the domain name you want to manage.

As an example, suppose you want to prevent all links for the www.example.com from being analyzed. You enter this domain in the Manage Link -> Exclude Link section of the Spince popup (in the browser toolbar). Then Spince will skip over any links that have the www.example.com domain.

## Additional Notes

A RESTful API is under development. New features and pull requests are appreciated. There are also plans to build Spince for other platforms (Firefox, Safari, mobile).

The tool currently works for English, Spanish, German, French, and Italian. More languages can be requested or implemented via pull requests.
