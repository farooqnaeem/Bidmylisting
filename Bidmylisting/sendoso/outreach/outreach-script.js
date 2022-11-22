const outreachRegex = /(https:\/\/[^]+.outreach.io\/prospects\/[0-9]+\/*)/;
SendosoScript.initialize(outreachRegex, () => OutreachWidget, 'outreach');
