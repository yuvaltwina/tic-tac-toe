import React from 'react';
import SiteTitle from '../../components/Site-title/SiteTitle';
import './LinkPage.scss';

function LinkContainer({ link }: { link: string }) {
  return (
    <button
      type="button"
      className="link-container"
      onClick={() => {
        navigator.clipboard.writeText(link);
      }}
    >
      <p>{link}</p>
    </button>
  );
}

function LinkPage() {
  return (
    <div className="link-page">
      <SiteTitle />
      <h1>press link to copy</h1>
      <LinkContainer link="https://www.figma.com/file/5IrMzbvEnUfq7b7nsbuWVU/eeeeeeeeeeeeerwerwerwerw" />
    </div>
  );
}

export default LinkPage;
