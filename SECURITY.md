# Security Policy

## Supported Versions

Only the latest major version of jsonpathly receives security fixes.

| Version | Supported |
| ------- | --------- |
| 3.x     | Yes       |
| < 3.0   | No        |

## Reporting a Vulnerability

Please do not report security issues in public GitHub issues.

Report them privately through GitHub's
[private vulnerability reporting](https://github.com/atamano/jsonpathly/security/advisories/new).
Include the affected version, a minimal query and document that reproduce the problem, and the impact you observed.

You can expect an acknowledgement within a week. Once a fix is released, a GitHub Security Advisory is published crediting the reporter, unless they prefer to stay anonymous.

jsonpathly is often used to evaluate queries against untrusted JSON, so reports about excessive CPU or memory use (denial of service) are in scope, as well as anything that makes a query execute code or modify the queried document.
