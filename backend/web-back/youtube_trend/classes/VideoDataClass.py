class YoutubeVideoData ():
    def __init__(self, id, title, thumbnail_url, channel_title):
        self.id = id
        self.title = title
        self.thumbnail_url = thumbnail_url
        self.channel_title = channel_title
        self.comments = []
    
    def set_comments(self, comments):
        self.comments = comments