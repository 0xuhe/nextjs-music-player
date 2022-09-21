import { Playlist, Prisma } from "@prisma/client";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import GradientLayout from "../../components/GradientLayout";
import SongTable from "../../components/SongTable";
import { useStoreActions } from "../../lib/store";

const getColor = (index: number) => {
  const colors = ["red", "green", "blue", "yellow", "purple", "pink", "orange"];
  return colors[index % colors.length];
};

const PlaylistDetail = ({ playlist }: playlistPageProps) => {
  const changeActiveSongs = useStoreActions(
    (actions) => actions.changeActiveSongs
  );
  const changeActiveSong = useStoreActions(
    (actions) => actions.changeActiveSong
  );
  const setPlaying = useStoreActions((actions) => actions.changePlaying);
  setPlaying(false);
  changeActiveSongs(playlist.songs);
  changeActiveSong(playlist.songs[0]);

  return (
    <GradientLayout
      title={playlist.name}
      color={getColor(playlist.id)}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://dummyimage.com/120x60&text=${encodeURIComponent(
        playlist.name
      )}`}
    >
      <SongTable songs={playlist.songs}></SongTable>
    </GradientLayout>
  );
};

interface playlistPageProps {
  playlist: PlaylistWithSongsAndArtist;
}

export type PlaylistWithSongsAndArtist = Prisma.PlaylistGetPayload<{
  include: {
    songs: {
      include: {
        artist: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

interface playlistPageParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<
  playlistPageProps,
  playlistPageParams
> = async ({ req, params, res }) => {
  const id = params!.id;
  let userId;
  try {
    userId = validateToken(req.cookies.TRAX_ACCESS_TOKEN!).id;
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +id,
      userId: userId,
    },

    include: {
      _count: {
        select: {
          songs: true,
        },
      },
      songs: {
        include: {
          artist: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      playlist,
    },
  };
};

export default PlaylistDetail;
