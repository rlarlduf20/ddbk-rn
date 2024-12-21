export const WEBVIEW_URL = "http://172.30.1.41:3000";

export const disableZoomJS = `
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
    true;
`;
