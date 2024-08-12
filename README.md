# progressify

Convert your GameMaker HTML5 game into a progressive web app, by generating and automatically including a manifest JSON file and service worker in the HTML output. 
## Dependencies
Requires:
 - Node.JS v20 on PATH (earlier or later versions may work)
### Notes
The `index.html` used for your game must include the [template tags](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Extension_Creation/HTML5_Extensions.htm#:~:text=of%20a%20file-,Template%20HTML%20File,-You%20can%20get) included in the default `index.html` file (or at least the PreHead tag), as that's where the code injection required by this extension happens

## Extension options

### Name
Name of the game in question, to be used on splash screens/when starting it. If left blank, will use the projects name.
### Short Name
Name to be used if the original name doesn't fit. If left blank, will use the name field above (or the projects name if that's blank too). 
### Display Mode
What kind of UI will be available, options for this include `browser`, `minimal-ui`, `standalone`, and `fullscreen`. The effects of each option may differ between browsers, but generally, `fullscreen` looks the msot like a native app, and lower than that gets closer to a standard web browsers UI. 
### Background Colour
CSS Colour of the background for the opening splash screen
### Theme Colour
CSS Colour used for the system bar and otehr miscelalanious system UI elements
### Orientation
The default orientation to use, 
### Start URL
The URL to start on when opening the PWA (default is `index.html`. You probably don't need to change this. 
### Scope
The scope of the PWA, this controls what oages it can "contain". You probably don't need to change this. 
### Icon (192x192px)
A 192x192px icon, used for the app icon on device home screens/desktops
### Icon (512x512px)
A 512x512px icon, used on the splash screen when opening the PWA.

