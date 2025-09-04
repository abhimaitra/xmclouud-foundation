import React from 'react';
import {
  RichText as JssRichText,
  Text,
  useSitecoreContext,
  RichTextField,
  Field,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { JSX } from 'react';

type EventInfoProps = {
  params: { [key: string]: string };
  Title: Field<string>;
  Content: RichTextField;
  Intro: TextField;
};

type ComponentContentProps = {
  id: string;
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component content-intro ${props?.styles}`} id={id ? id : undefined}>
      <div className="component-content">{props.children}</div>
    </div>
  );
};

export const Default = (props: EventInfoProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;

  if (
    !(props && props.Title && props.Content && props.Intro) &&
    !sitecoreContext?.route?.fields?.Title &&
    !sitecoreContext?.route?.fields?.Content &&
    !sitecoreContext?.route?.fields?.Intro
  ) {
    return (
      <div className={`component content ${props?.params?.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-content">[Event Info]</div>
        </div>
      </div>
    );
  }
  const titleField = (
    props && props.Title ? props.Title : sitecoreContext?.route?.fields?.Title
  ) as TextField;

  const contentField = (
    props && props.Content ? props.Content : sitecoreContext?.route?.fields?.Content
  ) as RichTextField;

  const introField = (
    props && props.Intro ? props.Intro : sitecoreContext?.route?.fields?.Intro
  ) as TextField;

  return (
    <ComponentContent styles={props?.params?.styles} id={id}>
      <section>
        <h1>
          <Text field={titleField}></Text>
        </h1>
        <div>
          <JssRichText field={contentField} />
        </div>
        <div>
          <Text field={introField}></Text>
        </div>
        <div></div>
      </section>
    </ComponentContent>
  );
};
