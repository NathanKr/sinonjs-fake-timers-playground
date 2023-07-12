<h2>Motivation</h2>
This is popular package used by vitest to simulate setInterval , setTimout and Date. So interesting to play with it

<h2>Setup</h2>

```
npm i
```

<h2>Usage</h2>

```
npm test
```


<h2>Code</h2>
<ul>
<li>index.ts : use fake clock to be used with setTimout</li>
<li>time-utils-sync.test.ts : test isItDecember , pauseMs , logEverySec </li>
<li>time-utils-async.test.ts : test logEverySecWithAwait , runInterval</li>
</ul>


<h2>Reference</h2>
<ul>
<li>
<a href='https://github.com/sinonjs/fake-timers'>sinonjs/fake-timers</a></li>
<li><a href='https://gist.github.com/apieceofbart/e6dea8d884d29cf88cdb54ef14ddbcc4'>solution to test setInterval with async callback code</a></li>