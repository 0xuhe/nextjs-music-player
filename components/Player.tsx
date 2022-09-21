import {
  Box,
  Center,
  ButtonGroup,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  ClassAttributes,
  LegacyRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import ReactHowler from "react-howler";
import { useStoreState, useStoreActions } from "../lib/store";
import { SongWithArtistList } from "./SongTable";
import formatDuration from "format-duration";
import { formatTime } from "../lib/formatters";
export default function Player() {
  const [seek, setSeek] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const playing = useStoreState((state) => state.playing);
  const setPlaying = useStoreActions((actions) => actions.changePlaying);
  const activeSong = useStoreState((state) => state.activeSong);
  const activeSongs = useStoreState((state) => state.activeSongs);
  const changeActiveSong = useStoreActions(
    (actions) => actions.changeActiveSong
  );

  useEffect(() => {
    let timerId = 0;
    if (playing && !seeking) {
      const f = () => {
        const value = playerRef.current!.seek();
        console.log(value);

        setSeek(value);
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, seeking]);

  const playerRef = useRef<ReactHowler>(null);

  const indexBySong = activeSongs.findIndex((i) => {
    return activeSong?.id === i.id;
  });

  function nextSong() {
    if (isRepeat) {
      const getNextSong = () =>
        activeSongs[Math.floor(Math.random() * activeSongs.length)];
      let nextSong: SongWithArtistList[0] | null = null;
      do {
        nextSong = getNextSong();
      } while (activeSong?.id === nextSong.id);
      changeActiveSong(nextSong);
    } else {
      changeActiveSong(activeSongs[indexBySong + 1]);
    }
  }

  return (
    <Box>
      <ReactHowler
        src={activeSong ? activeSong.url : ""}
        playing={playing}
        ref={playerRef}
        onLoad={() => {
          setDuration(playerRef.current?.duration() ?? 0);
        }}
        onEnd={() => {
          if (isRepeat && playerRef.current) {
            setSeek(0);
            playerRef.current.seek(0);
          } else {
            nextSong();
          }
        }}
      ></ReactHowler>

      <Center mb="4">
        <ButtonGroup variant="link">
          <IconButton
            aria-label="shuffle"
            icon={<MdShuffle fontSize={"1.2rem"}></MdShuffle>}
            color={isShuffle ? "white" : "inherit"}
            onClick={() => {
              setIsShuffle((state) => !state);
            }}
          ></IconButton>
          <IconButton
            aria-label="prev"
            color={indexBySong === 0 ? "inherit" : "white"}
            disabled={indexBySong === 0}
            icon={<MdSkipPrevious fontSize={"1.2rem"}></MdSkipPrevious>}
            onClick={() => {
              changeActiveSong(activeSongs[indexBySong - 1]);
              setPlaying(true);
            }}
          ></IconButton>
          {playing ? (
            <IconButton
              aria-label="pause"
              icon={
                <MdPauseCircleFilled fontSize={"2.5rem"}></MdPauseCircleFilled>
              }
              color="white"
              onClick={() => {
                setPlaying(false);
              }}
            ></IconButton>
          ) : (
            <IconButton
              aria-label="play"
              onClick={() => {
                setPlaying(true);
              }}
              color="white"
              icon={
                <MdPlayCircleFilled fontSize={"2.5rem"}></MdPlayCircleFilled>
              }
            ></IconButton>
          )}

          <IconButton
            aria-label="next"
            color={indexBySong === activeSongs.length ? "inherit" : "white"}
            disabled={indexBySong === activeSongs.length - 1}
            onClick={() => {
              nextSong();
              setPlaying(true);
            }}
            icon={<MdSkipNext fontSize={"1.2rem"}></MdSkipNext>}
          ></IconButton>
          <IconButton
            aria-label="repeat"
            color={isRepeat ? "white" : "inherit"}
            onClick={() => {
              setIsRepeat((state) => !state);
            }}
            icon={<MdRepeat fontSize={"1.2rem"}></MdRepeat>}
          ></IconButton>
        </ButtonGroup>
      </Center>
      <Flex>
        <Text fontSize={"sm"} px="4">
          {formatTime(playerRef.current?.seek())}
        </Text>
        <Slider
          min={0}
          max={duration}
          step={1}
          aria-label="progress"
          value={seek}
          onChangeStart={() => {
            console.log("start");

            setSeeking(true);
          }}
          onChangeEnd={(value) => {
            console.log("end", value);
            // setSeek(value);
            // playerRef.current?.seek(value);
            setSeeking(false);
          }}
          onChange={(value) => {
            console.log(value);
            setSeek(value);
            playerRef.current?.seek(value);
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text fontSize={"sm"} px="4">
          {activeSong ? formatTime(duration) : "0:00"}
        </Text>
      </Flex>
    </Box>
  );
}
