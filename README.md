# External Keyboard Plugin for Cordova, Phonegap and Ionic

This project is part of a Simple Joy solution that required better bluetooth IR scanning.

The `cordova.plugins.ExternalKeyboard` provides an easy way to configure keyboard shortcuts for iOS 9 devices with an external bluetooth keyboard. The plugin runs an `after-install` hook to modify the MainViewController.h and MainViewController.m files as described below.


# Installation

First install the plugin proper:

    cordova plugin add https://github.com/nicborg/cordova.externalkeyboard.git

When the plugin is installed, the iosAfterInstall.js hook script will modify the MainViewController.h and MainViewController.m files as shown here:

## In `MainViewController.h`

replace 

```objective-c
@interface MainViewController : CDVViewController
@end
```

with 

```objective-c
#import "ExternalKeyboard.h"
@interface MainViewController : CDVViewController {
    NSMutableArray *commands;
}

- (void) setKeyCommands:(NSArray*) commands;
@end
```

## In `MainViewController.m`

add 

```Objective-c
- (BOOL)canBecomeFirstResponder {
    return YES;
}

- (void) setKeyCommands: (NSMutableArray*) cmds {
    commands = cmds;
}


- (NSArray *)keyCommands {
    return commands;
}

- (void) onKeyPress:(UIKeyCommand*) cmd {
    NSLog(@"onKeyPress");
    NSString *combo = [ExternalKeyboard getCombo:cmd];
    NSLog(@"COMBO [%@]", combo);
    NSString *jsStatement = [NSString NSString *jsStatement = [NSString stringWithFormat:@"cordova.fireDocumentEvent('external_keydown', {'key': '%@'})", combo];
    [self.commandDelegate evalJs:jsStatement];
}
```



### 

# Usage

## Set up 

Currently the expected format for shortcuts is a simple string with modifier keys and input keys delimited by a space and the commands delimited by a configurable string such as `|`:

```javascript
var commands = "ctrl s|ctrl n|meta s|meta alt j|up|shift up";
```

You can use arrow keys (`up`, `down`, `left`, `right`) and `enter`, `space`, `tab`, `del` either as single key commands or with combination with modifier. Please notice, that these keys will stop fulfilling their default function. Supported modifier keys are `meta`, `ctrl`, `alt`, `shift` and `caps`.

The `meta` key stands for the Command Key (⌘) on Mac. The Mac Option Key (⌥) is represented by "alt". The `caps` key stands for the CapsLock key. CapsLock cannot be combined with any other modifier keys.

Then send the commands to the plugin:

```javascript
var commands = "ctrl s|ctrl n|meta s|meta alt j",
    delimiter = "|";
cordova.plugins.ExternalKeyboard.setKeyCommands(commands, delimiter);
```


## Handling the shortcuts
On the page or in one of your modules, create the function that listens for the 'external_keydown' event on the document like so:
```javascript
document.addEventListener('external_keydown', function(event){ console.log(event.key)})
```

In Angular:
```javascript
  @HostListener('document:external_keydown', ['$event']) onExternalKeyDown(event) {
    const textInput = event.key;
      console.log("input received", textInput, event );
    }
  }
```

# Supported Platforms

- iOS

### Install for iOS only on a multi platform Cordova project

clone the repo, then run something similar to this:
```
plugman install --platform ios --project platforms/ios --plugin ~/devProjects/cordova.externalkeyboard
```
uninstall
```
plugman uninstall --platform ios --project platforms/ios --plugin cordova-external-keyboard
```

https://stackoverflow.com/questions/36923980/how-to-add-a-plugin-on-only-one-ionic-platform
