import {
    BigNumber,
    ethers
} from "ethers";
// import toast from "react-hot-toast";
// import {
//     explorePublicationProfiles
// } from "../apollo/exploreProfiles";
import {
    getProfiles,
    getProfilesCount
} from "../apollo/getProfiles";
// import {
//     recommendedProfiles
// } from "../apollo/recommendedProfiles";
// import {
//     dispatcher
// } from "../store";
// import {
//     getSimilarFailure,
//     getSimilarRequest,
//     getSimilarSuccess,
// } from "../_actions/user";
import { useProfilesStore } from "src/store/useProfilesStore";

const shuffle = (array) =>
    array
        .map((profile) => ({
            v: profile,
            sort: Math.random()
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(({
            v
        }) => v);

export async function getRandomProfiles(/*similarResults*/) {
    // dispatcher(getSimilarRequest());

    let data;
    let profiles = [];
    let wallets;

    // if (similarResults) {
    //     wallets = Object.keys(similarResults).map((key) =>
    //         similarResults[key].map((w) => ethers.utils.getAddress(w.wallet_address))
    //     )[0];

    //     const {
    //         data: similarData
    //     } = await getProfiles({
    //         ownedBy: wallets,
    //         limit: 50,
    //     });
    //     data = similarData;
    // }

    // if (data) {
    //     profiles = data.profiles.items;
    //     if (data.profiles.pageInfo.totalCount === 50) {
    //         let next = data.profiles.pageInfo.next;
    //         const {
    //             data: nextData
    //         } = await getProfiles({
    //             ownedBy: wallets,
    //             limit: 50,
    //             next,
    //         });
    //         if (nextData) {
    //             profiles = profiles.concat(nextData.profiles.pageInfo.next);
    //         }
    //     }
    //     profiles = shuffle(profiles);
    //     profiles = profiles.map((p) => ({
    //         ...p,
    //         match: profiles
    //             .map((p) =>
    //                 similarResults[Object.keys(similarResults)[0]].find(
    //                     (w) => w.wallet_address === p.ownedBy
    //                 )
    //             )
    //             .find((m) => m.wallet_address === p.ownedBy),
    //     }));
    // }

    // try {
    //     let {
    //         data: exploreData
    //     } = await explorePublicationProfiles({
    //         sortCriteria: "LATEST",
    //         publicationTypes: ["POST"],
    //         limit: 50,
    //     });
    //     if (exploreData && exploreData.explorePublications) {
    //         profiles = profiles.concat(
    //             exploreData.explorePublications.items.map(
    //                 (item) => item.profile || null
    //             )
    //         );
    //     }
    // } catch (e) {
    //     console.error("Error fetching explorer profiles", e.message);
    // }

    // try {
    //     let {
    //         data: recommendedData
    //     } = await recommendedProfiles();
    //     if (recommendedData && recommendedData.recommendedProfiles) {
    //         profiles = profiles.concat(shuffle(recommendedData.recommendedProfiles));
    //     }
    // } catch (e) {
    //     console.error("Error fetching recommended profiles", e.message);
    // }

    try {
        const profilesCount = await getProfilesCount();
        const randomIds = [...new Array(50)].map(() =>
            BigNumber.from(Math.round(Math.random() * profilesCount)).toHexString()
        );
        const {
            data: {
                profiles: {
                    items
                },
            },
        } = await getProfiles({
            profileIds: randomIds,
            limit: 50,
        });
        if (items && items.length > 0) {
            profiles = profiles.concat(shuffle(items));
        }
    } catch (e) {
        console.error("Error fetching ordinal profiles", e.message);
    }

    profiles = profiles
        .map((p) => p.id)
        .filter((id, index, self) => self.indexOf(id) === index)
        .map((id) => profiles.find((p) => p.id === id));

    profiles = shuffle(profiles);

    if (!profiles) {
        // dispatcher(getSimilarFailure());
        // toast.error("Error fetching profiles");
        console.log("Error fetching profiles")
        return;
    }

    // set profiles state
    useProfilesStore.setState({ profiles: profiles })
    // dispatcher(getSimilarSuccess(profiles));
}