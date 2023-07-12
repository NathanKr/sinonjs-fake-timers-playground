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
<li>time.utils.ts : test isItDecember , pauseMs , logEverySec </li>
</ul>

<h2>Open issues</h2>
<ul>
<li>I am not able to test logEverySecAndPause5Ms which as async operation in the callback</li>
</ul>

<h2>Reference</h2>
<a href='https://github.com/sinonjs/fake-timers'>sinonjs/fake-timers</a>