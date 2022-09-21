import {
  Box,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Song } from "@prisma/client";
import { PlaylistWithSongsAndArtist } from "../pages/playlist/[id]";
import {
  AiFillClockCircle,
  AiFillPlayCircle,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { formatDate, formatTime } from "../lib/formatters";
import { useStoreActions, useStoreState } from "../lib/store";

export type SongWithArtistList = PlaylistWithSongsAndArtist["songs"];

export default function SongTable({ songs }: { songs: SongWithArtistList }) {
  const changeActionSongs = useStoreActions(
    (actions) => actions.changeActiveSongs
  );
  const changeActionSong = useStoreActions(
    (actions) => actions.changeActiveSong
  );
  const activeSong = useStoreState((state) => state.activeSong);
  const setPlaying = useStoreActions((actions) => actions.changePlaying);

  return (
    <Box>
      <Box px="40px" mb="4">
        <IconButton
          aria-label="play"
          icon={<AiOutlinePlayCircle fontSize={"40px"} />}
          rounded="full"
          colorScheme={"twitter"}
          onClick={() => {
            changeActionSongs(songs);
            changeActionSong(songs[0]);
            setPlaying(true);
          }}
        ></IconButton>
      </Box>
      <TableContainer>
        <Table variant="unstyled">
          <Thead borderBottom={"1px solid rgba(255,255,255,.2)"}>
            <Tr>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>ADDED AT</Th>
              <Th>
                <AiFillClockCircle></AiFillClockCircle>
              </Th>
            </Tr>
          </Thead>
          <Tbody color="white">
            {songs.map((song, index) => (
              <Tr
                key={song.id}
                _hover={{
                  backgroundColor: "rgba(255,255,255,.2)",
                }}
                bgColor={
                  song.id === activeSong?.id ? "rgba(255,255,255,.2)" : ""
                }
                cursor={"pointer"}
                transition="all 0.2s"
                onClick={() => {
                  changeActionSong(song);
                  setPlaying(true);
                }}
              >
                <Td>{index + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
