import styled from "styled-components/macro";

const colorSessionName = "#555f6a";
const borderSectionColor = "#353b42";
const smallScreen = "900px";
const bigScreen = "1280px";
const inputTextInactive = "#7881A1";
const colorAccent = "#59a781";

export const StyledVideos = styled.div`
  width: 100%;
  .filter{
    position: relative;
    top: 0;
    left: 0;
    padding-left: 5%;
    border-bottom: 1px solid ${borderSectionColor};
    width: 95%;
    letter-spacing: 1px;
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    border-radius: 2px;
    padding: 1.4rem 2rem 1.6rem;
    label{
        color: #666;
    }
    
     input {
      flex-grow: 1;
      color: $input-text-active;
      line-height: 1.5rem;
      font-size: 1.5rem;
      vertical-align: middle;
      &::-webkit-input-placeholder {
        color: ${inputTextInactive};
      }
    }
  }
  .section-title {
    color: #666;
    position: relative;
    top: 0;
    left: 0;
    padding-left: 5%;
    border-bottom: 1px solid ${borderSectionColor};
    width: 95%;
    letter-spacing: 1px;
    font-size: 10px;
    line-height: 20px;
    margin-bottom: 20px;
  }

  .no-any {
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    font-size: 1.2em;
    justify-content: center;

    .nosession-any-text {
      margin: 10px;
    }


    &_state-enter-active {
      display: none;
    }
  }
}

.videos__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 94%;
  padding-left: 3%;
  padding-right: 3%;

  &_count-0, &_count-1, &_count-2 {
    justify-content: center;
  }

  &_count-3 {
    @media screen and (max-width: ${bigScreen}) {
      justify-content: flex-start;
    }

    @media screen and (min-width: ${bigScreen} + 1) {
      justify-content: center;
    }
  }

  .videos-container {
    flex: 0 0 auto;
    transition: all 0.5s;
    
    flex-basis: 33.333%;
    max-width: 33.333%;
    
    @media screen and (max-width: ${smallScreen}) {
      flex-basis: 100%;
      max-width: 100%;
    }

    @media screen and (min-width: ${smallScreen} + 1) and (max-width: ${bigScreen}) {
      flex-basis: 50%;
      max-width: 50%;
    }

    @media screen and (min-width: ${bigScreen} + 1) {
      flex-basis: 33.333%;
      max-width: 33.333%;
    }
    video{
      flex-basis: 98%;
      max-width: 98%;
      padding: 0 5px;
    }
    .video-cap {
      height: 30px;
      line-height: 30px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .12), 0 1px 4px rgba(0, 0, 0, .12);
      margin: -3px 5px 0;
      padding: 0 5px;
     
      &__name {
        overflow: hidden;
        background-color: ${colorSessionName};
        font-family: "Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 13px;
      }
       &__buttons{
           padding:0;
           margin-bottom: 10px;
       }
       &__download{
        background-color: ${colorAccent};
        padding: 5px 5px;
        color: #FFF;
        line-height: 30px;
        text-align: center;
       }
       
       &__delete{
        height: 28px;
        margin: 0;
        padding: 0;
        color: #fff;
        width: 25px;
        background: rgb(232, 120, 111);
        border: none;
        text-align: center;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      
      }


    }    //TRANSITIONS
    &_state-enter {
      opacity: 0.01;
    }

    &_state-enter-active {
      opacity: 1;
      transition: opacity 500ms ease-in;
    }

    &_state-exit {
      opacity: 1;
    }

    &_state-exit-active {
      opacity: 0.01;
      transition: opacity 500ms ease-out;
    }
  }
`;
