<h1>mhenderson-webserver</h1>
Personal web application for Canadian software developer Marcie Henderson.

<h2>Dependencies</h2>
<ul>
  <li>Angular CLI </li>
  <li>Angular Material </li>
  <li>NodeJS </li>
  <li>npm </li>
</ul>

<h2>Usage</h2>
<ul>
  <li>
    Clone: <code>git clone https://github.com/marciehenderson/mhenderson-webserver.git</code>
    <ul><li><em>Downloads repository to local machine in current directory.</em></li></ul>
  </li>
  <li>
    Build: <code>cd app && ng build --verbose</code>
    <ul>
      <li><em>Enters the app directory and builds the web app to the dist directory.</em></li>
      <li><em>Note: successful build output is already provided, only build manually if making local changes.</em></li>
    </ul>
  </li>
  <li>
    Move: <code>cd app && cp -a dist/app/browser/. &ltTARGET_DIRECTORY_PATH&gt</code>
    <ul>
      <li><em>Enters the app directory and copies all required materials from the dist/app/browser directory into your specified target directory.</em></li>
      <li><em>Note: this action will automatically overwrite any files with the same name as the ones copied. This is useful for deploying onto a server, but may not be ideal if there is a file you want to avoid overwriting.</em></li>
    </ul>
  </li>
</ul>

<h2>License</h2>
TBD
