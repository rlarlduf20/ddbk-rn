export const WEBVIEW_URL = "http://10.50.9.31:3000";

export const disableZoomJS = `
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
    true;
`;
