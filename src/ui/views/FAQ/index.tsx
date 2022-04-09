import React from "react";

const FAQ = () => {
  return (
    <article className="content space-y-5">
      <h2>FAQs</h2>

      <section className="space-y-2">
        <h4>Driver App</h4>
        <details>
          <summary>
            What do I need to download the Fastly Technician App?
          </summary>
          <p>
            You are able to download the Fastly Technician app on both Apple and
            Android devices. You should running Android version 4.4 or greater.
            To check the version of Android you have, just navigate on your
            phone as described below:
          </p>
          <ol>
            <li>Open your device's Settings.</li>
            <li>Tap About Phone or About Device.</li>
            <li>Tap Android Version to display your version information.</li>
          </ol>
        </details>
        <details>
          <summary>Where can I get the Fastly Technician App?</summary>
          <p>
            The Fastly Technician App is available for free in the Google Play
            Store and the App Store.
          </p>
        </details>
      </section>

      <section className="space-y-2">
        <h4>How to use portal and app</h4>
        <details>
          <summary>
            Can I use any browser to access and use the Dispatch Portal?
          </summary>
          <p>
            Use Google Chrome or Microsoft Edge for optimal performance. You can
            use other browsers, but some features may be limited.
          </p>
        </details>
        <details>
          <summary>Walk-through Guide</summary>
          <details className="mb-2">
            <summary>Dispatch Pro Portal</summary>
            <p>Managing Jobs</p>
            <p>Background Check</p>
            <p>Add Expense</p>
            <p>Creating Drivers / Signing In App</p>
          </details>
          <details>
            <summary>Urgently Technician App</summary>
            <p>Overview</p>
            <p>Job Stacking</p>
            <p>Sending Logs</p>
          </details>
        </details>
        <details>
          <summary>Finance</summary>
          <details>
            <summary>How to add expenses through Dispatch Portal?</summary>
            <p>Dispatch Pro | Add Expenses</p>
            <p>
              In order to receive payment on additional charges, all additional
              charges must be accompanied by relevant photos and photo receipts
              via the Dispatch Portal. All additional charges must be added to
              jobs within 10 days of completion to be eligible for payment.
            </p>
          </details>
        </details>
      </section>

      <section className="space-y-2">
        <h4>Brand Specific Guides</h4>
        <details>
          <summary>BMW</summary>
          <p>BMW Shift Lock Override</p>
          <p>BMW Jump Start</p>
          <p>BMW Eight Point Tie Down Procedure</p>
        </details>
        <details>
          <summary>Polestar</summary>
          <p>Attaching and Removing the Towing Eyelet</p>
          <p>Recovery</p>
        </details>
      </section>
    </article>
  );
};

export default FAQ;
