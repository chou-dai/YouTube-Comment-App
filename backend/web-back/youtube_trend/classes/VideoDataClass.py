class YoutubeVideoData ():
    def __init__(self, id, title, thumbnail_url, channel_title):
        self.id = id
        self.title = title
        self.thumbnail_url = thumbnail_url
        self.channel_title = channel_title
        self.comment_str = ""
        # 単語と数のリスト [('急', 5), ('上昇', 5), ('一', 3)]
        self.comment_word_count_list = []
    
    def set_comment_str(self, comment_str):
        self.comment_str = comment_str
    
    def set_comment_word_count_list(self, comment_word_count_list):
        self.comment_word_count_list = comment_word_count_list