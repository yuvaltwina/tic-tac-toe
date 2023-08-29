import React, { ReactNode } from 'react';
import './SiteTitle.scss';

interface SiteTitleProps {
  children?: ReactNode;
}

function SiteTitle({ children }: SiteTitleProps) {
  return (
    <div className="site-title">
      <h2>
        TIK&nbsp;
        <span>TAC</span>
        &nbsp;TOE
      </h2>
      {children}
    </div>
  );
}
function SubTitle({ children }: SiteTitleProps) {
  return <h3 className="sub-title">{children}</h3>;
}

SiteTitle.SubTitle = SubTitle;

export default SiteTitle;
